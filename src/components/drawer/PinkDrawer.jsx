import { Input } from "@windmill/react-ui";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import React, { useContext, useEffect, useRef, useState } from "react";

//internal import
import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import InputValue from "@/components/form/input/InputValue";
import LabelArea from "@/components/form/selectOption/LabelArea";
import Uploader from "@/components/image-uploader/Uploader";
import usePinkSubmit from "@/hooks/usePinkSubmit";
import DrawerButton from "@/components/form/button/DrawerButton";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import SwitchToggleFour from "@/components/form/switch/SwitchToggleFour";
import { AdminContext } from "@/context/AdminContext";

const PinkDrawer = ({ id }) => {
  const { state, dispatch } = useContext(AdminContext);
  const { adminInfo } = state;

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
    published,
    setPublished,
    currency,
    discountType,
    setDiscountType,
    isSubmitting,
    handleSelectLanguage,
  } = usePinkSubmit(id);

  return (
    <>
      <div className="w-full relative  p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title="Бүртгэх"
            // description={t("UpdatePinkDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title="Нэмэх"
            // description={t("AddPinkDescription")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Регистр" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="REGISTER"
                  name="REGISTER"
                  type="text"
                  placeholder="REGISTER"
                />
                <Error errorName={errors.pinkCode} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Овог" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="LAST_NAME"
                  name="LAST_NAME"
                  type="text"
                  placeholder="LAST_NAME"
                />
                <Error errorName={errors.pinkCode} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Нэр" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="FIRST_NAME"
                  name="FIRST_NAME"
                  type="text"
                  placeholder="FIRST_NAME"
                />
                <Error errorName={errors.pinkCode} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Нөлөөлсөн" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="IS_INF"
                  name="IS_INF"
                  type="number"
                  placeholder="IS_INF"
                />
                <Error errorName={errors.pinkCode} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Толгой 1" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="TOLGOI_1"
                  name="TOLGOI_1"
                  type="text"
                  placeholder={adminInfo.name.en}
                />
                <Error errorName={errors.pinkCode} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Толгой 2" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="TOLGOI_2"
                  name="TOLGOI_2"
                  type="text"
                  placeholder="TOLGOI_2"
                />
                <Error errorName={errors.pinkCode} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Толгой 3" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="TOLGOI_3"
                  name="TOLGOI_3"
                  type="text"
                  placeholder="TOLGOI_3"
                />
                <Error errorName={errors.pinkCode} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="RELATION" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="RELATION"
                  name="RELATION"
                  type="number"
                  placeholder="RELATION"
                />
                <Error errorName={errors.pinkCode} />
              </div>
            </div>

            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Published")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  handleProcess={setPublished}
                  processOption={published}
                />
                <Error errorName={errors.productType} />
              </div>
            </div> */}
          </div>

          <DrawerButton id={id} title="Pink" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default PinkDrawer;
