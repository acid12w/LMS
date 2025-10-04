const YoutubeEmbed = ({ embedId, width, height }) => {

  const link = embedId.split("=")[1];
  return (
    <div className="h-80 md:h-[24rem] lg:h-[30rem] p-1 ">
      <iframe
        width='100%'
        height='100%'
        src={`https://www.youtube.com/embed/${link}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className="rounded-lg"
      />
    </div>
  );
};

export default YoutubeEmbed;
