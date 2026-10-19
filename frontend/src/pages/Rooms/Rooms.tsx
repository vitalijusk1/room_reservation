import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import RoomFilters from "./components/RoomFilters/RoomFilters";
import RoomGrid from "./components/RoomGrid/RoomGrid";
import axiosInstance from "../../api/axiosInstance";
import { endpoints } from "../../api/endpoints";
import { getErrorMessage } from "../../api/getErrorMessage";
import type { Room } from "./components/RoomGrid/types";
import type { RoomFilterOptions } from "./components/RoomFilters/types";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const Rooms = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filterOptions, setFilterOptions] = useState<RoomFilterOptions | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingFilterOptions, setLoadingFilterOptions] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoadingFilterOptions(true);
      try {
        const response = await axiosInstance.get(endpoints.roomFilterOptions());
        setFilterOptions(response.data);
        setLoadingFilterOptions(false);
      } catch (err) {
        setError(getErrorMessage(err));
        setLoadingFilterOptions(false);
      }
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(endpoints.rooms(), {
          params: searchParams,
        });
        setRooms(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(getErrorMessage(err));
        setLoading(false);
      }
    };
    fetchRooms();
  }, [searchParams]);

  if (loading || loadingFilterOptions) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!filterOptions) return null;

  return (
    <section className="mx-auto w-full max-w-[1440px] space-y-6 px-8 py-9">
      <PageHeader
        title="Meeting rooms"
        description="Find the right space for your next meeting."
      />
      <RoomFilters filterOptions={filterOptions} />
      <RoomGrid rooms={rooms} />
    </section>
  );
};

export default Rooms;
