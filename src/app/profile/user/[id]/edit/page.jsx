import FormEditProfile from "@/components/Form/EditProfile";
import ProfileLayout from "@/components/Layouts/ProfileLayout";
import { getCustomerById } from "@/libs/customer-libs";
import { cookies } from "next/headers";

const page = async ({ params }) => {
  const { id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const userCustomer = await getCustomerById(token);
  return (
    <ProfileLayout
      title={"Edit Profile"}
      description={"Perbarui Profile Anda"}
      linkTitle={"Kembali"}
      linkHref={`/profile/user/${userCustomer.data.user_id}`}
      customerData={userCustomer.data}
    >
      <div className="border border-gray-200 p-6 rounded-lg shadow-md">
        <FormEditProfile
          id={id}
          customerData={userCustomer.data}
          token={token}
        />
      </div>
    </ProfileLayout>
  );
};

export default page;
