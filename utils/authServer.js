import nookies from "nookies";
import base from "@utils/airtable";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  let token = cookies.loginToken;

  if (!token) {
    return { redirect: { destination: "/auth", permanent: true } };
  }

  let records = await base("me")
    .select({ filterByFormula: `{token}="${token}"` })
    .all();

  if (!records || records.length == 0) {
    return { redirect: { destination: "/auth", permanent: true } };
  }

  return { props: { token } };
}
