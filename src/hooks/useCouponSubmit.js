import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import CouponServices from "@/services/CouponServices";
import { notifyError, notifySuccess } from "@/utils/toast";
// import useTranslationValue from "./useTranslationValue";
import useUtilsFunction from "./useUtilsFunction";

const useCouponSubmit = (id) => {
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

      const couponData = {
        ...data,
        FIRST_NAME: data.FIRST_NAME,
      };

      // console.log("couponData", couponData);

      // setIsSubmitting(false);
      // return;

      if (id) {
        const res = await CouponServices.updateCoupon(id, couponData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      } else {
        const res = await CouponServices.addCoupon(couponData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
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
      setValue("LAST_NAME");
      setValue("FIRST_NAME");

      setValue("AGE");
      setValue("GENDER");
      setValue("NEW_KHOROO");
      setValue("NEW_ADDRESS");
      setValue("BAIGUULLAGA_NAME");
      setValue("PHONE_LAST");
      setValue("PHONE2");
      setValue("UUR");
      setValue("SONGUULIIN_BAIRSHIL");
      setValue("SANAL_OGNOO");
      setValue("BORN_AIMAG");
      setValue("BORN_SOUM");
      setValue("IS_MAN");
      setValue("IS_AN");
      setValue("TSALIN");
      setValue("SCHOOL");
      setValue("GYEAR");
      setValue("IS_INF");
      setValue("TOLGOI_1");
      setValue("TOLGOI_2");
      setValue("TOLGOI_3");
      setValue("RELATION");
      setValue("KHOTHON_GUDAMJ");
      setValue("BAISHIN_GER");
      setValue("APARTMENT");
      setValue("X");
      setValue("Y");
      setValue("Z");

      clearErrors("title");
      clearErrors("productType");
      clearErrors("couponCode");
      clearErrors("endTime");
      clearErrors("discountPercentage");
      clearErrors("minimumAmount");
      // setValue("language", language);
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await CouponServices.getCouponById(id);
          if (res) {
            // console.log('res coupon', res);
            setResData(res);

            setValue("REGISTER", res.REGISTER);
            setValue("LAST_NAME", res.LAST_NAME);
            setValue("FIRST_NAME", res.FIRST_NAME);

            setValue("AGE", res.AGE);
            setValue("GENDER", res.GENDER);
            setValue("NEW_KHOROO", res.NEW_KHOROO);
            setValue("NEW_ADDRESS", res.NEW_ADDRESS);
            setValue("BAIGUULLAGA_NAME", res.BAIGUULLAGA_NAME);
            setValue("PHONE_LAST", res.PHONE_LAST);
            setValue("PHONE2", res.PHONE2);
            setValue("UUR", res.UUR);
            setValue("SONGUULIIN_BAIRSHIL", res.SONGUULIIN_BAIRSHIL);
            setValue("SANAL_OGNOO", res.SANAL_OGNOO);
            setValue("BORN_AIMAG", res.BORN_AIMAG);
            setValue("BORN_SOUM", res.BORN_SOUM);
            setValue("IS_MAN", res.IS_MAN);
            setValue("IS_AN", res.IS_AN);
            setValue("TSALIN", res.TSALIN);
            setValue("SCHOOL", res.SCHOOL);
            setValue("GYEAR", res.GYEAR);
            setValue("IS_INF", res.IS_INF);
            setValue("TOLGOI_1", res.TOLGOI_1);
            setValue("TOLGOI_2", res.TOLGOI_2);
            setValue("TOLGOI_3", res.TOLGOI_3);
            setValue("RELATION", res.RELATION);
            setValue("KHOTHON_GUDAMJ", res.KHOTHON_GUDAMJ);
            setValue("BAISHIN_GER", res.BAISHIN_GER);
            setValue("APARTMENT", res.APARTMENT);
            setValue("X", res.X);
            setValue("Y", res.Y);
            setValue("Z", res.Z);

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

export default useCouponSubmit;
