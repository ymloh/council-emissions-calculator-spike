import { useState } from "react";
import { Text, Select, Grid } from "@chakra-ui/react";
import Layout from "../../components/Layout/Layout";
import useForm from "../../components/FormProvider";
import { departments } from "../../utils/constants";
import {
  BackButton,
  SubmitButton,
} from "../../components/LinkButton/LinkButton";
import capitalize from "../../utils/capitalize";
import Q5Progress from "../../public/images/progress-bar/q5-progress-dots.svg";
import { sendFormResponse } from "../../utils/dbApi";

export default function Question5() {
  const { answers, setAnswers } = useForm();
  const [department, setDepartment] = useState(answers.department);

  const saveAnswers = () => setAnswers((prev) => ({ ...prev, department }));
  return (
    <Layout isText={true} Progress={Q5Progress}>

      <Text textAlign="center">
        Which department do you work for?
      </Text>
      <Select
        mt={8}
        maxW={280}
        placeholder="Please select"
        onChange={(e) => setDepartment(e.target.value)}
      >
        {departments.map((department) => (
          <option key={department} value={department}>
            {capitalize(department)}
          </option>
        ))}
      </Select>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <BackButton href="/form/Question4" onClick={saveAnswers} />
        <SubmitButton
          href="/results"
          disabled={!department}
          onClick={() =>
            setAnswers((prev) => {
              const response = { ...prev, department };
              //console.log(`form 5 updates: ${JSON.stringify(response)}`);
              sendFormResponse(response);
              return response;
            })
          }
        />
      </Grid>
    </Layout>
  );
}