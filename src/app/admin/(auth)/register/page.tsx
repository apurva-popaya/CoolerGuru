import { AdminAuthShell } from "@/components/admin/auth/admin-auth-shell";
import { AdminRegisterForm } from "@/components/admin/auth/admin-register-form";

export default function AdminRegisterPage() {
  return (
    <AdminAuthShell
      title="Create admin account"
      description="Enter your details to create your CoolerGuru administrator account."
    >
      <AdminRegisterForm />
    </AdminAuthShell>
  );
}
