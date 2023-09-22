import { FC } from "react";

import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const styles = {
  footer: {
    position: "fixed",
    textAlign: "center",
    width: "100%",
    bottom: "0",
    backgroundColor: "transparent"
  }
} as const;

const CustomFooter: FC = () => {
  return (
    <Footer style={styles.footer}>
      <Typography>
        <Text>
          Please, leave a ⭐️ on this{" "}
          <a href="https://github.com/NFTEarth" target="_blank" rel="noopener noreferrer">
            analytics app
          </a>{" "}
          if it is helpful.
        </Text>
      </Typography>
    </Footer>
  );
};

export default CustomFooter;
