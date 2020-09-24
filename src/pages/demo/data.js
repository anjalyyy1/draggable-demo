const dummyData = [
  {
    type: "text",
    content: "Some content",
    tag: "h1",
    styling: {
      width: "211",
      height: "115",
      x: "232",
      y: "130",
      fontSize: "20",
    },
    responsive: {
      990: {
        width: "211",
        height: "115",
        x: "348",
        y: "130",
        fontSize: "20",
      },
    },
  },
  {
    type: "img",
    attributes: {
      src: "https://picsum.photos/id/237/100/50",
      draggable: false,
    },
    tag: "img",
    styling: {
      width: "211",
      height: "115",
      x: "232",
      y: "65",
    },
    responsive: {
      990: {
        width: 6,
        fontSize: "8",
      },
    },
  },
];

export { dummyData };
