import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { AdminContext } from "@/context/AdminContext";
import { SidebarContext } from "@/context/SidebarContext";
import PenServices from "@/services/PenServices";
import CouponServices from "@/services/CouponServices";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/toast";
// import useTranslationValue from "./useTranslationValue";
import useUtilsFunction from "./useUtilsFunction";

const usePenSubmit = (id) => {
  const { state, dispatch } = useContext(AdminContext);
  const { adminInfo } = state;
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [language, setLanguage] = useState(lang);
  const [resData, setResData] = useState({});
  const [published, setPublished] = useState(false);
  const [discountType, setDiscountType] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { handlerTextTranslateHandler } = useTranslationValue();
  const { currency } = useUtilsFunction();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const penData = {
        ...data,
        TOLGOI_1: adminInfo.name,
        STATUS: 0, // Default to 0
      };

      // Wait for the response from getCouponByRegister
      const res = await CouponServices.getCouponByRegister(data.REGISTER);

      if (res) {
        if (res.IS_INF === 1) {
          notifyWarning("Давхацсан байна!");
          penData.STATUS = 1;
        } else {
          penData.STATUS = 2;
          notifySuccess("Амжилттай бүртгэгдлээ!");
          res.IS_INF = 1;
          await CouponServices.updateCoupon(res._id, res);
        }
        console.log("penData", penData); // Log the updated penData
      } else {
        penData.STATUS = 0;
        notifyError("Регистр дугаар олдсонгүй!");
      }

      // const res = await PenServices.addPen(penData);
      // setIsUpdate(true);
      // setIsSubmitting(false);
      // closeDrawer();

      ///
      console.log("penData", penData);

      if (id) {
        const res = await PenServices.updatePen(id, penData);
        setIsUpdate(true);
        setIsSubmitting(false);
        closeDrawer();
      } else {
        const res = await PenServices.addPen(penData);
        setIsUpdate(true);
        setIsSubmitting(false);
        closeDrawer();
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message);
      setIsSubmitting(false);
      closeDrawer();
    }
  };

  const handleSelectLanguage = (lang) => {};

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});

      setValue("REGISTER");
      setValue("TOLGOI_1");
      setValue("TOLGOI_2");
      setValue("TOLGOI_3");
      setValue("RELATION");
      setValue("STATUS");

      clearErrors("title");
      clearErrors("productType");
      clearErrors("penCode");
      clearErrors("endTime");
      clearErrors("discountPercentage");
      clearErrors("minimumAmount");
      // setValue("language", language);
      return;
    }
    if (id) {
      console.log("end baina");

      (async () => {
        try {
          const res = await PenServices.getPenById(id);
          if (res) {
            // console.log('res pen', res);
            setResData(res);

            setValue("REGISTER", res.REGISTER);
            setValue("TOLGOI_1", res.TOLGOI_1);
            setValue("TOLGOI_2", res.TOLGOI_2);
            setValue("TOLGOI_3", res.TOLGOI_3);
            setValue("RELATION", res.RELATION);
            setValue("STATUS", res.STATUS);

            // setPublished(res.status === "show" ? true : false);
            // setDiscountType(
            //   res.discountType?.type === "percentage" ? true : false
            // );
            // setImageUrl(res.logo);
          }
        } catch (err) {
          notifyError(err?.response?.data?.message || err?.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, clearErrors, language, lang]);

  return {
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
    isSubmitting,
    setDiscountType,
    handleSelectLanguage,
  };
};

export default usePenSubmit;
