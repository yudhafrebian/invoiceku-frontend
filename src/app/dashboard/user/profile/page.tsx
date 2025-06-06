"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Formik } from "formik";
import { profileSchema } from "@/schemas/user-schema";
import { withAuth } from "@/hoc/withAuth";
import ProfileForm from "@/view/components/user/profileForm";

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

export default ProfilePage;
