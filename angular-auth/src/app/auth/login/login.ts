import { Component, inject, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../models/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals para o formulário e estado
  credentials = signal<LoginRequest>({ username: '', password: '' });
  error = signal<string>('');
  loading = signal<boolean>(false);

  // Computed: formulário está válido? (opcional, mas útil)
  isFormValid = signal<boolean>(false); // vamos atualizar manualmente

  constructor() {
    // Atualiza isFormValid sempre que credentials mudar
    effect(() => {
      const creds = this.credentials();
      this.isFormValid.set(creds.username.trim().length > 0 && creds.password.trim().length > 0);
    });
  }

  onSubmit() {
    this.loading.set(true);
    this.error.set('');

    this.authService.login(this.credentials()).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Falha no login. Verifique suas credenciais.';
        this.error.set(errorMsg);
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  // Métodos auxiliares para atualizar o signal (two-way binding manual)
  updateUsername(value: string) {
    this.credentials.update((creds) => ({ ...creds, username: value }));
  }

  updatePassword(value: string) {
    this.credentials.update((creds) => ({ ...creds, password: value }));
  }
}
