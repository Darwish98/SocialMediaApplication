import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import ActivityDetaledHeader from "./ActivityDetaledHeader";
import ActivityDetaledInfo from "./ActivityDetaledInfo";
import ActivityDetaledChat from "./ActivityDetaledChat";
import ActivityDetaledSidebar from "./ActivityDetaledSidebar";

export default observer(function ActivityDetalis() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetaledHeader activity={activity} />
        <ActivityDetaledInfo activity={activity}/>
        <ActivityDetaledChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetaledSidebar />
      </Grid.Column>
    </Grid>
  );
});
