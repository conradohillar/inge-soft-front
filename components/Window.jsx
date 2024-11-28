import { View } from "react-native";

const Window = ({ children, className, height, width }) => {
  return (
    <View
      style={{
        height: height || 250,
        width: width || 350,
        paddingVertical: 15,
        paddingHorizontal: 18,
        marginHorizontal: 6,
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 25,
        backgroundColor: "#eee",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      className={className}
    >
      {children}
    </View>
  );
};

export default Window;
