import { Timeline, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { TYPEINSTALLMENTPAYMENT } from "../typeInstallmentPayment";
import dayjs from "dayjs";

function TimeLine(props: { data: TYPEINSTALLMENTPAYMENT | null }) {
  if (!props.data) return;

  return (
    <Timeline
      mt={"md"}
      active={props.data.timeLineInstallmentPayment ? props.data.timeLineInstallmentPayment.length : 0}
      bulletSize={18}
    >
      {props.data.timeLineInstallmentPayment ? props.data.timeLineInstallmentPayment.map((timeline) => {
        return (
          <Timeline.Item
            bullet={<IconCheck size={12} />}
            title={timeline.title}
            key={timeline.id}
          >
            <Text c="dimmed" size="sm">
              {timeline.message}
            </Text>
            <Text size="xs" mt={4}>
              {dayjs(timeline.createdAt).format("DD / MMM / YYYY")}
            </Text>
            <Text size="xs" mt={4}>
              ผู้ดำเนินการ :{" "}
              {timeline.creatBy ? timeline.creatBy.username : "ลูกค้าดำเนินการ"}
            </Text>
          </Timeline.Item>
        );
      }) : <></>} 
    </Timeline>
  );
}

export default TimeLine;
