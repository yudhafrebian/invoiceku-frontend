"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import ProfileForm from "@/view/components/user/profileForm";
import { withAuth } from "@/hoc/withAuth";

const ProfilePage= () => {
  return (
    <div className="px-80 py-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your profile settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default withAuth(ProfilePage);
