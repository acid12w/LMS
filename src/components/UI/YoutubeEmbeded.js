const YoutubeEmbed = ({ embedId }) => {
  const link = embedId.split("=")[1];

  return (
    <div className="video-responsive">
      <iframe
        width="98%"
        height="580"
        src={`https://www.youtube.com/embed/${link}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
