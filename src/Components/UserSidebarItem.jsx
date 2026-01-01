import { useUser } from "@clerk/clerk-react";

function UserSidebarItem() {
  const { user } = useUser();

  const displayName =
    // user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    "Account";

  return (
    <span className="menu-text text-md font-medium truncate max-w-[140px]">
      {displayName}
    </span>
  );
}

export default UserSidebarItem;
