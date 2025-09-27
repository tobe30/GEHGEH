import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  CallControls,
  StreamTheme,
  CallParticipantsList,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { joinCall } from "../lib/api";
import useAuthUser from '../hooks/useAuthUser';


const apiKey = import.meta.env.VITE_STREAM_API_KEY;

const VideoCall = () => {
  const { bookingId: rawBookingId } = useParams();
  const bookingId = rawBookingId?.replace(/^call_/, "");

  console.log(bookingId)

  const { authUser } = useAuthUser();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["video-call", bookingId],
    queryFn: () => joinCall(bookingId),
    enabled: !!bookingId,
  });

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const initCall = async () => {
      if (!data?.token || !data?.userId) return;
  console.log(authUser)


  const user = {
          id: authUser._id,
          name: authUser.username,
        };
      try {
        const videoClient = new StreamVideoClient({
          apiKey,
          user,
          token: data.token,
        });

        const callInstance = videoClient.call("default", bookingId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (err) {
        console.error("Error joining call:", err);
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [data, bookingId]);

  if (isLoading || isConnecting) return <p>Loading call...</p>;
  if (!client || !call) return <p>Failed to initialize call.</p>;

  return (
        <div className="h-screen flex flex-col items-center bg-gray-900 justify-center">
          <div className="relative">
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
            <SpeakerLayout />
            <CallControls />
          <CallParticipantsList />
            </StreamTheme>
      </StreamCall>
    </StreamVideo>
        </div>
          </div>
  );
};

export default VideoCall;
