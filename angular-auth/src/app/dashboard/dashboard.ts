// src/app/dashboard/dashboard.component.ts
import { Component, inject, signal, computed, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../core/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnDestroy {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);

  // Signals de estado
  userName = signal<string>('Guest');
  userRoles = signal<string[]>([]);

  // Dados protegidos como signals
  secretData = signal<any | null>(null);
  adminData = signal<any | null>(null);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  // Computed: usuário tem role admin?
  isAdmin = computed(() => this.userRoles().includes('ADMIN'));

  private subscriptions = new Subscription();

  constructor() {
    // Inicializa dados do usuário a partir do JWT
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName.set(user.name || user.sub || user.full_name);
      // this.userRoles.set(user.roles || []);
      this.userRoles.set(user.groups || []);
    }

    // Carrega os dados na inicialização
    this.loadProtectedData();

    // Opcional: efeito para log/debug (pode remover depois)
    effect(() => {
      console.log('Secret data atualizado:', this.secretData());
    });
  }

  loadProtectedData() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.secretData.set(null);
    this.adminData.set(null);

    // Dados protegidos normais
    this.subscriptions.add(
      this.apiService.getSecretData().subscribe({
        next: (data) => {
          this.secretData.set(data.message);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set('Falha ao carregar dados protegidos');
          this.isLoading.set(false);
          console.error(err);
        },
      })
    );

    // Dados apenas para admin
    if (this.isAdmin()) {
      this.subscriptions.add(
        this.apiService.getAdminData().subscribe({
          next: (data) => {
            this.adminData.set(data.message);
          },
          error: (err) => {
            const msg =
              err.status === 403
                ? 'Acesso negado - Permissão de admin necessária'
                : 'Falha ao carregar dados admin';
            this.errorMessage.set(msg);
            console.error(err);
          },
        })
      );
    }
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
