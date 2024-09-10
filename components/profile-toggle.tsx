"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./../components/ui/dropdown-menu";
import {
  User2Icon,
  LogOut,
  Trash2,
  RefreshCcw,
  Settings,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteUserDialog } from "./dialogs/DeleteDialog";
import { UpdateUserDialog } from "./dialogs/UpdateDialog";
import useMounted from "@/hooks/user-mounted";

export function ProfileToggle() {
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);

  const mounted = useMounted();
  if (!mounted) return null;

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(!openUpdateDialog);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User2Icon className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User className="mr-2 h-3 w-3" /> <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Settings className="mr-2 h-3 w-3" /> <span>Setting</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={handleOpenUpdateDialog}>
                  <RefreshCcw className="mr-2 h-3 w-3" /> <span>Update</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleOpenDeleteDialog}>
                  <Trash2 className="mr-2 h-3 w-3" /> <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className=" mr-2 h-3 w-3" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteUserDialog
        open={openDeleteDialog}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
      />
      <UpdateUserDialog
        open={openUpdateDialog}
        handleOpenUpdateDialog={handleOpenUpdateDialog}
      />
    </>
  );
}
