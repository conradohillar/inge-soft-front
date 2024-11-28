import { forwardRef } from "react";
import { ListItemFrame, Text, styled, themeable, useListItem } from "tamagui";

const CustomListItemFrame = styled(ListItemFrame, {
  backgroundColor: "#FFFFFF",
  height: 100,
  pressStyle: {
    backgroundColor: "#F5F5F5",
  },
  alignItems: "center",
});

export const CustomListItem = CustomListItemFrame.styleable((propsIn, ref) => {
  const { props } = useListItem(propsIn);

  return <CustomListItemFrame {...props} ref={ref} />;
});
