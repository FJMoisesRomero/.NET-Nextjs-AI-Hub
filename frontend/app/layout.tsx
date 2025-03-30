import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const esES = {
  signIn: {
    start: {
      title: "Iniciar sesión",
      subtitle: "para continuar en AI Hub",
      actionText: "¿No tienes una cuenta?",
      actionLink: "Registrarse",
    },
    emailCode: {
      title: "Revisa tu correo",
      subtitle: "para continuar con el inicio de sesión",
      formTitle: "Código de verificación",
      formSubtitle: "Ingresa el código enviado a tu correo",
      resendButton: "Reenviar código",
    },
    password: {
      title: "Bienvenido de nuevo",
      subtitle: "para continuar en AI Hub",
      formTitle: "Contraseña",
      formSubtitle: "Ingresa tu contraseña",
      forgotPasswordLink: "¿Olvidaste tu contraseña?",
    },
  },
  signUp: {
    start: {
      title: "Crear una cuenta",
      subtitle: "para comenzar en AI Hub",
      actionText: "¿Ya tienes una cuenta?",
      actionLink: "Iniciar sesión",
    },
    emailLink: {
      title: "Verifica tu correo",
      subtitle: "para continuar con el registro",
      formTitle: "Enlace de verificación",
      formSubtitle: "Haz clic en el enlace enviado a tu correo",
      resendButton: "Reenviar enlace",
    },
    continue: {
      title: "Completa tu registro",
      subtitle: "para comenzar a usar AI Hub",
    },
  },
  userButton: {
    action__signOut: "Cerrar sesión",
    action__emailAddresses: "Correos electrónicos",
    action__profile: "Perfil",
    action__accountSettings: "Configuración de cuenta",
  },
  formFieldLabel__emailAddress: "Correo electrónico",
  formFieldLabel__password: "Contraseña",
  formFieldLabel__firstName: "Nombre",
  formFieldLabel__lastName: "Apellido",
  formFieldLabel__username: "Usuario",
  formButtonPrimary: "Continuar",
  footerActionLink__useAnotherMethod: "Usar otro método",
  dividerText: "o",
  formFieldError__notAllowed: "Este correo no está permitido",
  formFieldError__invalid: "Correo inválido",
  formFieldError__required: "Campo requerido",
}

export const metadata: Metadata = {
  title: "AI Hub - Tu Centro de Creación con IA",
  description: "Plataforma de generación de contenido impulsada por IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      localization={esES}
    >
      <html lang="es">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#020817] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]`}
          style={{
            backgroundImage: "url('/noise.png'), radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.3), rgba(255,255,255,0))",
            backgroundBlendMode: "overlay, normal",
          }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
