import { ListItemFrame, styled, useListItem } from "tamagui";

const CustomListItemFrame = styled(ListItemFrame, {
  height: 100,
  alignItems: "center",
  paddingStart: 30,
  backgroundColor: "#F7F7F7",
  pressStyle: {
    backgroundColor: "#d0d0d0",
  },
});

export const CustomListItem = CustomListItemFrame.styleable((propsIn, ref) => {
  const { props } = useListItem(propsIn);

  return <CustomListItemFrame {...props} ref={ref} />;
});
