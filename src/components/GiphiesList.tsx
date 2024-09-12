import { Giphy } from "../interfaces/Giphy";

const GiphiesList = (props: { data: Giphy[] }) => {
  const { data } = props;

  return data.map((giphy) => (
    <div className="card" key={giphy.id}>
      <img
        className="card-image"
        src={giphy.images.downsized.url}
        alt={giphy.title}
      />
    </div>
  ));
};

export default GiphiesList;
