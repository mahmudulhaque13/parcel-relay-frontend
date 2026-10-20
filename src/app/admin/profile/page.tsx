import AccountProfileForm from "@/components/profile/account-profile-form";

export const metadata = {
  title: "My Profile | ParcelRelay Admin",
  description: "Review and update your ParcelRelay administrator profile.",
};

export default function AdminProfilePage() {
  return <AccountProfileForm roleLabel="Administrator" />;
}
