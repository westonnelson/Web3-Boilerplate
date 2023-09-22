import { FC, useEffect, useMemo, useState } from "react";

import { DownOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";

import arbitrum_Logo from "assets/images/arbitrum_Logo.png";
import ethereum_Logo from "assets/images/ethereum_Logo.png";
import fantom_Logo from "assets/images/fantom_Logo.png";
import polygon_logo from "assets/images/polygon_logo.png";
import zksync_Logo from "assets/images/zksync_Logo.png";
import bsc_Logo from "assets/svg/bsc_Logo.svg";
import optimistim_Logo from "assets/svg/optimistim_Logo.svg";
import { chainIds } from "data/chainIds";
import { useSwitchChain, useWindowWidthAndHeight } from "hooks";

const styles = {
  item: {
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px"
  },
  button: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    border: "0",
    borderRadius: "10px"
  }
};

type MenuItem = Required<MenuProps>["items"][number];

const ChainSelector: FC = () => {
  const switchChain = useSwitchChain();
  const { chainId, isActive } = useWeb3React();
  const { isMobile } = useWindowWidthAndHeight();
  const [selected, setSelected] = useState<MenuItem>();
  const [label, setLabel] = useState<JSX.Element>();

  const labelToShow = (logo: string, alt: string) => {
    return (
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <img src={logo} alt={alt} style={{ width: "25px", height: "25px", borderRadius: "10px", marginRight: "5px" }} />
      </div>
    );
  };

  const items: MenuProps["items"] = useMemo(
    () => [
      { label: "Arbitrum", key: chainIds.arbitrum, icon: labelToShow(arbitrum_Logo, "Arbitrum_Logo") },
      { label: "Ethereum", key: chainIds.ethereum, icon: labelToShow(ethereum_Logo, "Ethereum_logo") },
    
     
    ],
    []
  );

  useEffect(() => {
    if (!chainId) return;

    let selectedLabel;
    if (chainId === 1 || chainId === 5) {
      selectedLabel = labelToShow(ethereum_Logo, "Ethereum_logo");
    } else if (chainId === 137 || chainId === 80001) {
      selectedLabel = labelToShow(polygon_logo, "Polygon_logo");
    } else if (chainId === 10 || chainId === 420) {
      selectedLabel = labelToShow(optimistim_Logo, "Optimistim_Logo");
    } else if (chainId === 280 || chainId === 324) {
      selectedLabel = labelToShow(zksync_Logo, "zksync_Logo");
    } else if (chainId === 250 || chainId === 4002) {
      selectedLabel = labelToShow(fantom_Logo, "Fantom_Logo");
    } else if (chainId === 42161 || chainId === 421613) {
      selectedLabel = labelToShow(arbitrum_Logo, "Arbitrum_Logo");
    } else {
      selectedLabel = labelToShow(bsc_Logo, "BNB_logo");
    }

    setLabel(selectedLabel);
    setSelected(items.find((item) => item?.key === chainId.toString()));
  }, [chainId]);

  const onClick: MenuProps["onClick"] = async ({ key }) => {
    await switchChain(Number(key)).catch((error) => {
      console.error(`"Failed to switch chains: " ${error}`);
    });
  };

  if (!chainId || !isActive) return null;

  return (
    <div>
      <Dropdown menu={{ items, onClick }}>
        <Button style={{ ...styles.button, ...styles.item }}>
          {!selected && <span style={{ marginLeft: "5px" }}>Select Chain</span>}
          {selected && isMobile ? (
            <div style={{ display: "flex", alignItems: "center", minWidth: "25px" }}>
              <span style={{ paddingTop: "5px" }}>{label}</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", minWidth: "100px" }}>
              <span style={{ paddingTop: "5px" }}>{label}</span>
              {/* @ts-expect-error title is a valid object*/}
              <span style={{ marginRight: "10px" }}>{selected?.label}</span>
            </div>
          )}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ChainSelector;
