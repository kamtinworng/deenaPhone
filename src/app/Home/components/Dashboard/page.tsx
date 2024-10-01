"use client";

import { Container, Flex, Paper, Title, Text, SimpleGrid } from "@mantine/core";

function Dashboard() {
  return (
    <Container fluid color="brand" p={"xl"}>
      <Flex justify="center" direction={"column"} align={"center"}>
        <Title c={"brand"}>Trusted by creators worldwide</Title>
        <Title order={3} c={"gray"}>
          Lorem ipsum dolor sit amet consect adipisicing possimus.
        </Title>
      </Flex>
      <Paper radius={"md"} mt={"xl"}>
        <SimpleGrid cols={4}>
          <Flex p={"xl"} direction={"column"} align={"center"}>
            <Title>8,000+</Title>
            <Text>Creators on the platform</Text>
          </Flex>
          <Flex p={"xl"} direction={"column"} align={"center"}>
            <Title>3%</Title>
            <Text>Flat platform fee</Text>
          </Flex>
          <Flex p={"xl"} direction={"column"} align={"center"}>
            <Title>99.9%</Title>
            <Text>Uptime guarantee</Text>
          </Flex>
          <Flex p={"xl"} direction={"column"} align={"center"}>
            <Title>$70M</Title>
            <Text>Paid out to creators</Text>
          </Flex>
        </SimpleGrid>
      </Paper>
    </Container>
  );
}

export default Dashboard;
