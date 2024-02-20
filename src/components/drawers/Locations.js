import {
  Drawer,
  Space,
  Button,
  Input,
  Tabs,
  List,
  Popconfirm,
  notification,
  Menu,
  message,
} from "antd";

import "../../css/drawer.css";
import { useState, useEffect } from "react";
import { UseSelectedTiploc } from "../../hooks/SelectedTiplocHook";

import search from "../../assets/icons/search.svg";
import back from "../../assets/icons/back.svg";

const Locations = (props) => {
  const { selectedTiploc, setSelectedTiploc } = UseSelectedTiploc();

  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [recentlyUsed, setRecentlyUsed] = useState([]);
  const [data, setData] = useState([]);
  const [notificationContext, notificationApi] = props.notifications;
  const [messageContext, messageApi] = props.messages;

  const direction = "left";

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const onTrackedLocationClick = (item, e) => {
    if (e.key === "view-details") {
      console.log("View details");
      console.log(item);
    }

    if (e.key === "stop-tracking") {
      setSelectedTiploc(selectedTiploc.filter((i) => i !== item));

      messageApi.open({
        type: "success",
        content: "Location removed from tracking.",
      });
    }
  };

  const setTracked = (item) => {
    setChildrenDrawer(false);
    setSearchText("");
    setRecentlyUsed([...recentlyUsed, item]);
    setSelectedTiploc([...selectedTiploc, item]);

    // Inform user that routes are being loaded
    notificationApi.open({
      message: "Routes loading...",
      description:
        "Please wait while we load routes from your selected location. This may take a few seconds.",
      duration: 5,
    });

    // Inform user that item was added to their 'recently used' list
    if (recentlyUsed.length === 0 && selectedTiploc.length === 0) {
      notificationApi.open({
        message: "Recently Used",
        description:
          "A location was added to your recently used list, you can disable this in settings.",
        duration: 5,
      });
    }
  };

  useEffect(() => {
    if (data.length === 0 && childrenDrawer === true) {
      import("../../assets/data/tiplocs.json").then((newData) => {
        setData(newData.Tiplocs);
        messageApi.open({
          type: "success",
          content:
            newData.Tiplocs.length.toLocaleString() + " locations loaded.",
        });
      });
    }
  });

  return (
    <>
      <Drawer
        title="Tracked Locations"
        onClose={() => {
          props.setActiveDraw("menu");
        }}
        open={true}
        placement={direction}
        closeIcon={<img alt="back" src={back} />}
        bodyStyle={{ padding: 0 }}
        extra={
          <Space>
            <Button
              onClick={showChildrenDrawer}
              shape="circle"
              type="primary"
              ghost
              icon={
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5rem"
                    height="1.5rem"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M450.001-450.001h-200q-12.75 0-21.375-8.628-8.625-8.629-8.625-21.384 0-12.756 8.625-21.371 8.625-8.615 21.375-8.615h200v-200q0-12.75 8.628-21.375 8.629-8.625 21.384-8.625 12.756 0 21.371 8.625 8.615 8.625 8.615 21.375v200h200q12.75 0 21.375 8.628 8.625 8.629 8.625 21.384 0 12.756-8.625 21.371-8.625 8.615-21.375 8.615h-200v200q0 12.75-8.628 21.375-8.629 8.625-21.384 8.625-12.756 0-21.371-8.625-8.615-8.625-8.615-21.375v-200Z" />
                  </svg>
                </>
              }
            ></Button>
          </Space>
        }
      >
        <Input
          placeholder="Search Locations"
          allowClear
          size="large"
          prefix={
            <img
              style={{
                padding: "0px 0.5rem",
                opacity: "50%",
              }}
              alt="search"
              src={search}
            />
          }
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
            marginTop: "-1px",
            borderRight: "none",
            borderLeft: "none",
            borderRadius: "0",
            padding: "1rem 1rem",
          }}
        />

        <List
          size="large"
          dataSource={selectedTiploc.filter((item) => {
            return item.DisplayName.toLowerCase().includes(
              searchText.toLowerCase()
            );
          })}
          renderItem={(item) => (
            <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
              <Menu
                onClick={(e) => onTrackedLocationClick(item, e)}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  borderRight: "none",
                  margin: "0px",
                  padding: "0px",
                }}
                defaultSelectedKeys={[]}
                mode="vertical"
                items={[
                  {
                    key: item.Tiploc,
                    label: item.DisplayName,
                    defaultSelectedKeys: [],
                    children: [
                      {
                        key: "view-details",
                        label: "View details",
                        onClick: null,
                      },
                      {
                        key: "stop-tracking",
                        label: "Stop tracking",
                        onClick: null,
                      },
                    ],
                  },
                ]}
              />
            </List.Item>
          )}
        />

        <Drawer
          title="Track New Location"
          closable={true}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
          placement={direction}
          closeIcon={<img alt="back" className="rotate-180" src={back} />}
          bodyStyle={{ padding: 0 }}
        >
          <Input
            placeholder="Search TIPLOCs"
            allowClear
            size="large"
            prefix={
              <img
                style={{
                  padding: "0px 0.5rem",
                  opacity: "50%",
                }}
                alt="search"
                src={search}
              />
            }
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
              marginTop: "-1px",
              borderRight: "none",
              borderLeft: "none",
              borderRadius: "0",
              padding: "1rem 1rem",
            }}
          />

          <Tabs
            defaultActiveKey="0"
            tabBarStyle={{
              padding: ".5rem 2rem 0px 2rem",
              fontWeight: "500",
              marginBottom: "0px",
            }}
          >
            <Tabs.TabPane key={0} tab="All">
              <List
                size="large"
                dataSource={data.filter((item) => {
                  return (
                    item.DisplayName.toLowerCase().includes(
                      searchText.toLowerCase()
                    ) &&
                    !selectedTiploc.some(
                      (trackedItem) => trackedItem.Tiploc === item.Tiploc
                    )
                  );
                })}
                pagination={true}
                renderItem={(item) => (
                  <Popconfirm
                    icon={null}
                    title="Track location"
                    description="Are you sure you want to track this location?"
                    onConfirm={() => setTracked(item)}
                    onCancel={null}
                    okText="Yes"
                    cancelText="No"
                  >
                    <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
                      <div>{item.DisplayName}</div>
                      <div>{item.Tiploc}</div>
                    </List.Item>
                  </Popconfirm>
                )}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key={1} tab="Recently Used">
              <List
                size="large"
                dataSource={recentlyUsed.filter((item) => {
                  return (
                    item.DisplayName.toLowerCase().includes(
                      searchText.toLowerCase()
                    ) &&
                    !selectedTiploc.some(
                      (trackedItem) => trackedItem.Tiploc === item.Tiploc
                    )
                  );
                })}
                renderItem={(item) => (
                  <Popconfirm
                    icon={null}
                    title="Track location"
                    description="Are you sure you want to track this location?"
                    onConfirm={() => setTracked(item)}
                    onCancel={() =>
                      setRecentlyUsed(recentlyUsed.filter((i) => i !== item))
                    }
                    okText="Yes"
                    cancelText="Remove from recently used"
                  >
                    <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
                      <div>{item.DisplayName}</div>
                      <div>{item.Tiploc}</div>
                    </List.Item>
                  </Popconfirm>
                )}
              />
            </Tabs.TabPane>
          </Tabs>
        </Drawer>
      </Drawer>
    </>
  );
};

export default Locations;
