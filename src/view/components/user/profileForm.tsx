"use client";
import * as React from "react";
import { Formik, Form, FormikProps } from "formik";
import { profileSchema } from "@/schemas/user-schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { apiCall } from "@/utils/apiHelper";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { setLogin } from "@/utils/redux/features/authSlice";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, CircleUser, Loader2, User2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface IFormValue {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  profile_img?: File | null;
}

const ProfileForm = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => {
    return state.authState;
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await apiCall.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        setLogin({
          first_name: response.data.data.user_profile.first_name,
          last_name: response.data.data.user_profile.last_name,
          email: response.data.data.user.email,
          phone: response.data.data.user_profile.phone,
          profile_img: response.data.data.user_profile.profile_img,
          is_verified: response.data.data.user.is_verified,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfile = async (values: IFormValue) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("email", values.email);
      formData.append("phone", values.phone ?? "");
      if (uploadFile) {
        formData.append("profile_img", uploadFile);
      }

      const response = await apiCall.patch("/user/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile Updated", {
        description: response.data.message,
      });

      if(user.email !== values.email) {
        toast.info("Email has been changed", {
          description: "Please verify your email",
        })
      }
      setIsEdit(false);
      setUploadFile(null);
      setImagePreview(null);
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to update profile", {
        description: error.response.data.error,
      });
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [refresh]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        profile_img: null,
      }}
      validationSchema={profileSchema}
      onSubmit={(values: IFormValue) => {
        values.profile_img = uploadFile;
        updateUserProfile(values);
      }}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleBlur, handleChange, resetForm, values } =
          props;
        return (
          <Form className="flex flex-col gap-4">
            {!isEdit ? (
              <Avatar className="md:w-40 md:h-40 w-24 h-24 mx-auto">
                <AvatarImage src={user.profile_img || undefined} />
                <AvatarFallback>
                  <CircleUser size={40} />
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="w-40 h-40 mx-auto relative group">
                <AvatarImage
                  src={
                    imagePreview ? imagePreview : user.profile_img || undefined
                  }
                />
                <AvatarFallback className="text-6xl">
                  <CircleUser size={40} />
                </AvatarFallback>
                <Label
                  htmlFor="profile_img"
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full"
                >
                  <Camera />
                </Label>
                <Input
                  id="profile_img"
                  className="hidden"
                  accept="image/*"
                  type="file"
                  onChange={handleFileChange}
                />
              </Avatar>
            )}
            <Separator />
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2 md:w-1/2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={values.first_name}
                  disabled={!isEdit}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 md:w-1/2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={values.last_name}
                  disabled={!isEdit}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={values.email}
                disabled={!isEdit}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={values.phone}
                disabled={!isEdit}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <Button
                className={!isEdit ? "" : "hidden"}
                type="button"
                onClick={() => setIsEdit(!isEdit)}
              >
                Update
              </Button>
            </div>
            <div className={`${isEdit ? "flex" : "hidden"} gap-4 justify-end`}>
              {loading ? (
                <Button type="button" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </Button>
              ) : (
                <Button type="submit">Save</Button>
              )}
              <Button
                variant={"destructive"}
                type="button"
                onClick={() => {
                  setIsEdit(!isEdit);
                  setUploadFile(null);
                  setImagePreview(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
