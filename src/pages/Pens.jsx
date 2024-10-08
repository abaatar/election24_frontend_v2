import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  Select,
} from "@windmill/react-ui";
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import PenServices from "@/services/PenServices";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useFilter from "@/hooks/useFilter";
import PageTitle from "@/components/Typography/PageTitle";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import PenDrawer from "@/components/drawer/PenDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import CheckBox from "@/components/form/others/CheckBox";
import PenTable from "@/components/pen/PenTable";
import NotFound from "@/components/table/NotFound";
import UploadMany from "@/components/common/UploadMany";
import AnimatedContent from "@/components/common/AnimatedContent";

import { AdminContext } from "@/context/AdminContext";

const Pens = () => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { t } = useTranslation();
  const { toggleDrawer, lang } = useContext(SidebarContext);

  const [searchRegister, setSearchRegister] = useState("");
  const [searchTolgoi1, setSearchTolgoi1] = useState("");
  const [searchTolgoi2, setSearchTolgoi2] = useState("");
  const [searchTolgoi3, setSearchTolgoi3] = useState("");
  const [searchRelation, setSearchRelation] = useState(-1);
  const [searchStatus, setSearchStatus] = useState(-1);

  const registerRef = useRef("");
  const tolgoi1Ref = useRef("");
  const tolgoi2Ref = useRef("");
  const tolgoi3Ref = useRef("");
  const relationRef = useRef("");
  const statusRef = useRef("");

  const [error, setError] = useState("");

  const getCallback = useCallback(async () => {
    setError("");
    const q = new URLSearchParams();

    q.append("register", searchRegister);
    q.append("tolgoi1", searchTolgoi1);
    q.append("tolgoi2", searchTolgoi2);
    q.append("tolgoi3", searchTolgoi3);
    q.append("relation", searchRelation);
    q.append("status", searchStatus);

    try {
      const resp = await PenServices.getAllPens(q);
      return resp;
    } catch (err) {
      setError("Өөр шүүлтүүр нэмнэ үү!");
    }

    return [];
  }, [
    searchRegister,
    searchTolgoi1,
    searchTolgoi2,
    searchTolgoi3,
    searchRelation,
    searchStatus,
  ]);

  const loading = false;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function ff(params) {
      setData(await getCallback());
    }
    ff();
  }, [getCallback]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const { allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const {
    filename,
    isDisabled,
    dataTable,
    serviceData,
    totalResults,
    resultsPerPage,
    handleChangePage,
    handleSelectFile,
    setSearchPen,
    handleSubmitPen,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // handle reset field function
  const handleResetField = () => {
    setSearchPen("");
    registerRef.current.value = "";
    tolgoi1Ref.current.value = "";
    tolgoi2Ref.current.value = "";
    tolgoi3Ref.current.value = "";
    relationRef.current.value = -1;
    statusRef.current.value = -1;
  };

  return (
    <>
      <PageTitle>Илэрц</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title="Selected Pen" />
      <BulkActionDrawer ids={allId} title="Pens" />

      <MainDrawer>
        <PenDrawer id={serviceId} />
      </MainDrawer>

      <AnimatedContent>
        {adminInfo.name !== "guest" && (
          <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
            <CardBody>
              <form
                onSubmit={handleSubmitPen}
                className="py-3 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
              >
                <div className="flex justify-start xl:w-1/2  md:w-full">
                  <UploadMany
                    title="Pen"
                    exportData={data}
                    filename={filename}
                    isDisabled={isDisabled}
                    handleSelectFile={handleSelectFile}
                    handleUploadMultiple={handleUploadMultiple}
                    handleRemoveSelectFile={handleRemoveSelectFile}
                  />
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-200 via-blue-200 to-red-200 shadow-lg text-center flex justify-around items-center space-x-8">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-green-600">
                      Амжилттай
                    </span>
                    <span className="text-5xl font-bold text-green-700 animate-bounce">
                      {data.filter((item) => item.STATUS === 2).length}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-blue-600">
                      Давхардсан
                    </span>
                    <span className="text-5xl font-bold text-blue-700">
                      {data.filter((item) => item.STATUS === 1).length}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-red-600">
                      Алдаа
                    </span>
                    <span className="text-5xl font-bold text-red-700">
                      {data.filter((item) => item.STATUS === 0).length}
                    </span>
                  </div>
                </div>

                <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
                  {/* <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
                    <Button
                      disabled={isCheck.length < 1}
                      onClick={() => handleUpdateMany(isCheck)}
                      className="w-full rounded-md h-12 btn-gray text-gray-600"
                    >
                      <span className="mr-2">
                        <FiEdit />
                      </span>
                      {t("BulkAction")}
                    </Button>
                  </div> */}

                  {/* <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
                    <Button
                      disabled={isCheck.length < 1}
                      onClick={() => handleDeleteMany(isCheck)}
                      className="w-full rounded-md h-12 bg-red-500 btn-red"
                    >
                      <span className="mr-2">
                        <FiTrash2 />
                      </span>
                      Устгах
                    </Button>
                  </div> */}

                  <div className="w-full md:w-48 lg:w-48 xl:w-48">
                    <Button
                      onClick={toggleDrawer}
                      className="w-full rounded-md h-12"
                    >
                      <span className="mr-2">
                        <FiPlus />
                      </span>
                      Нэмэх
                    </Button>
                  </div>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        {/* <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "8px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Нөлөөлсөн
                </div>
                <Select
                  ref={isInfRef}
                  onChange={(e) => setSearchIsInf(e.target.value)}
                >
                  <option value={-1} defaultValue>
                    {"Nan"}
                  </option>
                  <option value={0}>{"Үгүй"}</option>
                  <option value={1}>{"Тийм"}</option>
                </Select>
              </div>

              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "8px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  МАН
                </div>
                <Select
                  ref={isManRef}
                  onChange={(e) => setSearchIsMan(e.target.value)}
                >
                  <option value={-1} defaultValue>
                    {"Nan"}
                  </option>
                  <option value={0}>{"Үгүй"}</option>
                  <option value={1}>{"Тийм"}</option>
                </Select>
              </div>

              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "8px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  АН
                </div>
                <Select
                  ref={isAnRef}
                  onChange={(e) => setSearchIsAn(e.target.value)}
                >
                  <option value={-1} defaultValue>
                    {"Nan"}
                  </option>
                  <option value={0}>{"Үгүй"}</option>
                  <option value={1}>{"Тийм"}</option>
                </Select>
              </div>
            </div>
          </CardBody>
        </Card> */}

        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchRegister(registerRef.current.value);
                setSearchTolgoi1(tolgoi1Ref.current.value);
                setSearchTolgoi2(tolgoi2Ref.current.value);
                setSearchTolgoi3(tolgoi3Ref.current.value);
                setSearchRelation(relationRef.current.value);
                setSearchStatus(statusRef.current.value);
              }}
              className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
            >
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input
                  ref={registerRef}
                  type="search"
                  placeholder={"Регистр"}
                />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input
                  ref={tolgoi1Ref}
                  type="search"
                  placeholder={"Толгой 1"}
                />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input
                  ref={tolgoi2Ref}
                  type="search"
                  placeholder={"Толгой 2"}
                />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input
                  ref={tolgoi3Ref}
                  type="search"
                  placeholder={"Толгой 3"}
                />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input ref={relationRef} type="search" placeholder={"Холбоо"} />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input ref={statusRef} type="search" placeholder={"Статус"} />
              </div>

              <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <div className="w-full mx-1">
                  <Button type="submit" className="h-12 w-full bg-emerald-700">
                    Filter
                  </Button>
                </div>

                <div className="w-full mx-1">
                  <Button
                    layout="outline"
                    onClick={handleResetField}
                    type="reset"
                    className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                  >
                    <span className="text-black dark:text-gray-200">Reset</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        // <Loading loading={loading} />
        <TableLoading row={12} col={8} width={140} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                </TableCell>
                <TableCell>Регистр</TableCell>
                <TableCell>Толгой 1</TableCell>
                <TableCell>Толгой 2</TableCell>
                <TableCell>Толгой 3</TableCell>
                <TableCell>Холбоо</TableCell>
                <TableCell>Статус</TableCell>

                {/* <TableCell className="text-center">
                  {t("catPublishedTbl")}
                </TableCell> */}
                {/* <TableCell>{t("CoupTblStartDate")}</TableCell>
                <TableCell>{t("CoupTblEndDate")}</TableCell> */}
                {/* <TableCell>{t("CoupTblStatus")}</TableCell> */}
                {/* <TableCell
                  className="sticky right-0 z-10 bg-teal-800 text-right text-white"
                  style={{ boxShadow: "1px 0 5px rgba(0, 0, 0, 0.1)" }}
                >
                  {t("CoupTblActions")}
                </TableCell> */}
              </tr>
            </TableHeader>
            <PenTable
              lang={lang}
              isCheck={isCheck}
              pens={dataTable}
              setIsCheck={setIsCheck}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Илэрц олдсонгүй." />
      )}
    </>
  );
};

export default Pens;
