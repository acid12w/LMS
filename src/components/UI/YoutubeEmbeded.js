const YoutubeEmbed = ({ embedId, width, height }) => {

  const link = embedId.split("=")[1];
  return (
    <div className="video-responsive">
      <iframe
        width={`${width}%`}
        height={height}
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
