import {
  Flex,
  Box,
  Divider,
  NumberFormatter,
  Modal,
  Anchor,
  Group,
  rem,
  Paper,
  Button,
  Image,
  Text,
} from "@mantine/core";
import { FileWithPath, Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { DataListItem } from "../typeDataListItem";
import { TYPEINSTALLMENTPAYMENT } from "../typeInstallmentPayment";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

function Payment(props: {
  open: boolean;
  close: () => void;
  installmentPayment: TYPEINSTALLMENTPAYMENT | null;
}) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [dataList, setDataList] = useState<DataListItem[]>([]);
  const [totalAdditionalPayment, setTotalAdditionalPayment] =
    useState<number>(0);
  const [dataPayment, setDataPayment] = useState<
    {
      base64: string;
      amount: number;
      id: string;
    }[]
  >([]);

  const session = useSession();

  useEffect(() => {
    const uploadFiles = async () => {
      const results = await Promise.all(
        files.map(async (file) => {
          const base64File = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = (reader.result as string)?.split(",")[1];
              resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          const formdata = new FormData();
          formdata.append("file", file, "[PROXY]");

          const myHeaders = new Headers();
          myHeaders.append(
            "Authorization",
            `Bearer ${process.env.NEXT_PUBLIC_EASYSLIP_KEY as string}`
          );

          const response = await fetch(
            "https://developer.easyslip.com/api/v1/verify",
            {
              method: "POST",
              body: formdata,
              headers: myHeaders,
            }
          );

          const data = await response.json();

          if (
            props.installmentPayment?.allIdReceiptImage.find((f) =>
              f === data.data?.payload ? true : false
            )
          ) {
            return;
          }

          if (data.status === 200) {
            setDataPayment((prevData) => [
              ...prevData,
              {
                base64: base64File as string,
                amount: data.data.amount.amount,
                id: data.data.payload,
              },
            ]);
          }

          return data;
        })
      );

      setDataList(results);

      const sumTotalAdditionalPayment = results
        .filter((result) => result?.status === 200)
        .reduce((sum, result) => sum + result?.data.amount.amount, 0);

      setTotalAdditionalPayment(sumTotalAdditionalPayment);
    };

    if (files.length > 0) {
      uploadFiles();
    }
  }, [files, props.installmentPayment?.allIdReceiptImage]);

  const payInstallmentPayments = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      idInstallmentPayments: props.installmentPayment?.id,
      receiptImages: dataPayment,
      userId:
        session.status === "unauthenticated" ? "" : session.data?.user?.id,
    });

    await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API as string}/updateInstallmentPayment`,
      {
        method: "POST",
        headers: myHeaders,
        body: raw,
      }
    );
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    const data = dataList[index];

    return (
      <>
        <Flex justify={"flex-start"} gap={"md"} align={"flex-start"}>
          <Box w={200}>
            <Image
              key={index}
              height={300}
              width={200}
              src={imageUrl}
              onLoad={() => URL.revokeObjectURL(imageUrl)}
              radius={"md"}
              alt="image"
            />
          </Box>
          <Flex direction={"column"}>
            <Text size="sm">file name: {file.name}</Text>
            <Text size="sm" c="dimmed">
              file size: {file.size}
            </Text>
            {data && data.status === 404 ? (
              <Text c={"red"}>
                {("message" in data && data.message) ||
                  "Error: Message not found"}
              </Text>
            ) : props.installmentPayment?.allIdReceiptImage.find((f) =>
                f === data?.data?.payload ? true : false
              ) ? (
              <Text c={"red"}>Error: สลิปซ้ำ!!!!</Text>
            ) : (
              data &&
              "data" in data && (
                <Flex direction={"column"}>
                  <Divider my={"xs"} />

                  <Text size="sm">
                    ผู้โอน: {data.data?.sender.account.name.th}
                  </Text>
                  <Text size="sm">
                    account name: {data.data?.sender.account.name.en}
                  </Text>

                  <Text size="sm">ธนาคาร: {data.data?.sender.bank.name}</Text>
                  <Text size="sm">
                    เลขบัญชี: {data.data?.sender.account.bank?.account}
                  </Text>
                  <Divider my={"xs"} />

                  <Text size="sm">
                    ผู้รับ: {data.data?.receiver.account.name.th}
                  </Text>
                  <Text size="sm">
                    account name: {data.data?.receiver.account.name.en}
                  </Text>

                  <Text size="sm">ธนาคาร: {data.data?.receiver.bank.name}</Text>
                  <Text size="sm">
                    เลขบัญชี: {data.data?.receiver.account.bank?.account}
                  </Text>
                  <Divider my={"xs"} />
                  <Text size="sm">
                    วันที่จ่าย :{" "}
                    {dayjs(data.data?.date).format("DD / MMM / YYYY")}
                  </Text>
                  <Text c={"brand"}>
                    จำนวน
                    <NumberFormatter
                      prefix=" "
                      value={data?.data?.amount.amount}
                      suffix=" THB"
                      thousandSeparator
                    />
                  </Text>
                </Flex>
              )
            )}
          </Flex>
        </Flex>
        <Divider my={"md"} />
      </>
    );
  });
  return (
    <Modal
      opened={props.open}
      onClose={props.close}
      title="Shopping Cart"
      size={"lg"}
    >
      {files.length > 0 ? (
        <>
          <Flex justify="flex-end" my={"md"}>
            <Anchor
              onClick={() => {
                setFiles([]);
                setDataList([]);
                setTotalAdditionalPayment(0);
              }}
            >
              ล้างสลิป
            </Anchor>
          </Flex>
          {previews}
        </>
      ) : (
        <Dropzone
          onDrop={setFiles}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
      <Paper p={"md"} bg={`var(--mantine-color-gray-2)`} radius="sm" my={"lg"}>
        <Flex justify={"space-between"}>
          <Text size="sm">จากครั้งที่แล้ว</Text>
          <Text size="sm">
            <NumberFormatter
              prefix="฿ "
              value={props.installmentPayment?.remainingAmount}
              thousandSeparator
            />
          </Text>
        </Flex>
        <Divider my={"md"} />
        <Flex justify={"space-between"}>
          <Text size="sm">รวมที่จ่ายเพิ่ม</Text>
          <Text size="sm">
            <NumberFormatter
              prefix="฿ "
              value={totalAdditionalPayment}
              thousandSeparator
            />
          </Text>
        </Flex>
        <Divider my={"md"} />
        <Flex justify={"space-between"}>
          <Text size="sm" fw={700}>
            คงเหลือที่ต้องผ่อนชำระ
          </Text>
          <Text size="sm">
            <NumberFormatter
              prefix="฿ "
              value={
                props.installmentPayment
                  ? props.installmentPayment?.remainingAmount -
                    totalAdditionalPayment
                  : 0
              }
              thousandSeparator
            />
          </Text>
        </Flex>
      </Paper>
      <Button
        disabled={totalAdditionalPayment === 0}
        fullWidth
        onClick={() => {
          payInstallmentPayments();
          setFiles([]);
          setDataList([]);
          setTotalAdditionalPayment(0);
          window.location.reload();
        }}
      >
        SUBMIT
      </Button>
    </Modal>
  );
}

export default Payment;
