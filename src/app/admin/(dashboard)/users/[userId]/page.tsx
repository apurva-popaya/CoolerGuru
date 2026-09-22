import { notFound } from "next/navigation";

import { AddUserForm } from "@/components/admin/add-user/add-user-form";
import { UserDetail } from "@/components/admin/user-detail/user-detail";
import { getUserDetail } from "@/components/admin/user-detail/user-detail-data";
import { usersData } from "@/components/admin/users/users-data";

interface AdminUserPageProps {
  params: Promise<{
    userId: string;
  }>;

  searchParams: Promise<{
    edit?: string;
  }>;
}

export default async function AdminUserPage({ params, searchParams }: AdminUserPageProps) {
  const { userId } = await params;

  const { edit } = await searchParams;

  const user = getUserDetail(userId);

  if (!user) {
    notFound();
  }

  if (edit === "true") {
    const userRow = usersData.find((item) => item.id === userId);

    if (!userRow) {
      notFound();
    }

    return (
      <AddUserForm
        mode="edit"
        userId={userRow.backendId !== undefined ? String(userRow.backendId) : userRow.id}
        initialValues={{
          name: userRow.name,

          mobile: userRow.mobile,

          role: userRow.role,
        }}
      />
    );
  }

  return <UserDetail user={user} />;
}
