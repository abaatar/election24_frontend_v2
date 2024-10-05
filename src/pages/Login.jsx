import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import { ImFacebook, ImGoogle } from "react-icons/im";
import { useTranslation } from "react-i18next";

//internal import
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import InputArea from "@/components/form/input/InputArea";
import useLoginSubmit from "@/hooks/useLoginSubmit";
import CMButton from "@/components/form/button/CMButton";

const Login = () => {
  const { t } = useTranslation();
  const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col justify-center overflow-y-auto md:flex-row">
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-2/3">
              <div className="w-full">
                <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  Нэвтрэх
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <LabelArea label="UserName" />
                  <InputArea
                    required={true}
                    register={register}
                    label="Username"
                    name="email"
                    type="text"
                    autoComplete="username"
                    placeholder="username"
                  />
                  <Error errorName={errors.email} />
                  <div className="mt-6"></div>
                  <LabelArea label="Password" />
                  <InputArea
                    required={true}
                    register={register}
                    label="Password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    placeholder="***************"
                  />
                  <Error errorName={errors.password} />

                  {loading ? (
                    <CMButton
                      disabled={loading}
                      type="submit"
                      className={`bg-emerald-600 rounded-md mt-4 h-12 w-full`}
                      to="/dashboard"
                    />
                  ) : (
                    <Button
                      disabled={loading}
                      type="submit"
                      className="mt-4 h-12 w-full"
                      to="/dashboard"
                    >
                      Нэвтрэх
                    </Button>
                  )}
                </form>

                {/* <p className="mt-1">
                  <Link
                    className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline"
                    to="/signup"
                  >
                    Бүртгэл үүсгэх
                  </Link>
                </p> */}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
