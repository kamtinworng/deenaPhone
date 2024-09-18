import { SimpleGrid, Card, Image, Text, AspectRatio } from "@mantine/core";
import classes from "./ArticlesCardsGrid.module.css";

const mockdata = [
  {
    title: "Top 10 places to visit in Norway this summer",
    image: "/Review1.jpg",
    date: "August 18, 2022",
  },
  {
    title: "Best forests to visit in North America",
    image: "/Review2.jpg",

    date: "August 27, 2022",
  },
  {
    title: "Hawaii beaches review: better than you think",
    image: "Review3.jpg",
    date: "September 9, 2022",
  },
  {
    title: "Mountains at night: 12 best locations to enjoy the view",
    image: "Review4.jpg",
    date: "September 12, 2022",
  },
];

export function Review() {
  const cards = mockdata.map((article) => (
    <Card
      key={article.title}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} fit="cover" alt="image" />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

  return <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>;
}
