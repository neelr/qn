import base from "@utils/airtable";
import Cookies from "cookies";

export default async (req, res) => {
  let cookies = Cookies(req, res);
  let token = cookies.get("loginToken");

  if (!token) {
    return res.send(401);
  }

  let records = await base("me")
    .select({ filterByFormula: `{token}="${token}"` })
    .all();

  if (!records || records.length == 0) {
    return res.send(401);
  }

  let { name, notes, email, phone, meetings, id } = req.body;
  let record;
  if (id) {
    record = await base("People").update([
      {
        id,
        fields: { Name: name, Notes: notes, Email: email, Phone: phone },
      },
    ]);
  } else {
    record = await base("People").create([
      { fields: { Name: name, Notes: notes, Email: email, Phone: phone } },
    ]);
    id = record[0].id;
  }
  let todelete;
  if (record[0].fields.Meetings) {
    let latter = meetings.map((v) => v.id)
      ? meetings.map((v) => v.id).filter((v) => v != undefined)
      : null;
    todelete = record[0].fields.Meetings.filter((v) => !latter.includes(v));
  }
  if (todelete) {
    await Promise.all(todelete.map((v) => base("Meetings").destroy(v)));
  }
  let meetID = [];
  if (meetings) {
    await Promise.all(
      meetings.map(async (meeting) => {
        if (meeting.id) {
          meetID.push(meeting.id);
          await base("Meetings").update(
            [
              {
                id: meeting.id,
                fields: {
                  Name: meeting.name,
                  Notes: meeting.notes,
                  Date: meeting.date,
                  Approved: true,
                  People: [id],
                },
              },
            ],
            { typecast: true }
          );
        } else {
          let record = await base("Meetings").create(
            [
              {
                fields: {
                  Name: meeting.name,
                  Notes: meeting.notes,
                  Date: new Date(meeting.date),
                  Approved: true,
                  People: [id],
                },
              },
            ],
            { typecast: true }
          );
          meetID.push(record[0].id);
        }
      })
    );
  }
  return res.send({ id, meetID });
};
