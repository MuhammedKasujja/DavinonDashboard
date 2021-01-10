export default {}
const url = process.env.REACT_APP_BASE_URL

const eventStream = new EventSource(`${url}/trips/stream/`)
eventStream.addEventListener("tripStateAdded", ((event: MessageEvent) => {
    const data = JSON.parse(event.data);

    console.log(data);
    //do something
}) as EventListener);
eventStream.addEventListener("tripStateModified", ((event: MessageEvent) => {
    const data = JSON.parse(event.data);

    console.log(data);
    //do something
}) as EventListener);
eventStream.addEventListener("tripStateRemoved", ((event: MessageEvent) => {
    const data = JSON.parse(event.data);

    console.log(data);
    //do something
}) as EventListener);