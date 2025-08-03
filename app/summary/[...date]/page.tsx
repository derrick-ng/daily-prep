import SummaryClient from "@/app/components/summary/SummaryClient";

// dynamic page rendering with catch-all segments is similar to passing the values in the url query
interface Props {
  params: Promise<{ date: string[] }>;
}

export default async function Summary({ params }: Props) {
  //params is async, must await before accessing properties
  const { date } = await params;

  if (date.length === 3) {
    const [year, month, day] = date;

    const isValidDate = /^\d{4}$/.test(year) && /^([1-9]|1[0-2])$/.test(month) && /^([1-9]|[12][0-9]|3[01])$/.test(day);

    if (!isValidDate) {
      return (
        <div>
          <div>Invalid Date</div>
        </div>
      );
    }
    return (
      <div>
        <div>above summary client</div>
        <SummaryClient date={date} />
      </div>
    );
  }

  return (
    <div>
      <div>Incorrect url format, should be /year/month/day (no 0 in front of month or day)</div>
      <div>Correct: /summary/2024/10/26</div>
      <div>Correct: /summary/2024/6/7</div>
      <div>Incorrect: /summary/2025/08/09</div>
    </div>
  );
}
