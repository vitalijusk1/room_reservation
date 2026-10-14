import PageHeader from "../../components/PageHeader/PageHeader";
import RoomFilters from "./components/RoomFilters/RoomFilters";
import RoomGrid from "./components/RoomGrid/RoomGrid";

const Rooms = () => {
  return (
    <section className="mx-auto w-full max-w-[1440px] space-y-6 px-8 py-9">
      <PageHeader
        title="Meeting rooms"
        description="Find the right space for your next meeting."
      />
      <RoomFilters />
      <RoomGrid />
    </section>
  );
};

export default Rooms;
