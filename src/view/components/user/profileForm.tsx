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

interface IFormValue {
  first_name: string;
  last_name: string;
  email: string;
}

const ProfileForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => {
    return state.authState;
  });
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

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
      }}
      validationSchema={profileSchema}
      onSubmit={(values: IFormValue) => {
        console.log(values);
      }}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleBlur, handleChange } = props;
        return (
          <Form>
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                defaultValue={user.first_name}
                disabled={!isEdit}
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                defaultValue={user.last_name}
                disabled={!isEdit}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                defaultValue={user.email}
                disabled={!isEdit}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={user.phone}
                disabled={!isEdit}
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
            <div className="flex gap-4 justify-end">
              <Button className={isEdit ? "" : "hidden"} type="submit">
                Save
              </Button>
              <Button
                variant={"destructive"}
                className={isEdit ? "" : "hidden"}
                type="button"
                onClick={() => setIsEdit(!isEdit)}
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
