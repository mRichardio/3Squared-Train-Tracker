import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import {
  Button,
  Modal,
  Tabs,
  Typography,
  Tooltip,
  TreeSelect,
  Form,
} from "antd";
import {
  SettingOutlined,
  DownOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, message, Space, Input } from "antd";
import { NumericInput } from "../inputs/NumericInput";

// Settings Hook
import { useSettings } from "../../hooks/SettingsHook";
import { useMap } from "../../hooks/MapHook";

// Cookies
import Cookies from "js-cookie";

import {
  themeItems,
  zoomControlsPositionItems,
  paginationItems,
  menuDirectionItems,
  notificationsOptions,
  menuAutoCloseItems,
  railsItems,
} from "../../options/settingsOptions";

// icons
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const allCookies = Cookies.get();

// Map Tilelayer Selector

const { TabPane } = Tabs;

const Settings = ({ setOpenGuide, ...props }) => {
  // Set the current Version number
  let versionNumber = "1.46.0";

  const { settings, setSettings } = useSettings();
  const { map, setMap } = useMap();

  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  const [defaultZoom, setDefaultZoom] = useState(settings.defaultZoom);
  const [inspectZoom, setInspectZoom] = useState(settings.inspectZoom);
  const [superZoom, setSuperZoom] = useState(settings.superZoom);

  useEffect(() => {
    if (defaultZoom > 1) {
      setSettings({
        ...settings,
        defaultZoom: defaultZoom,
      });

      // console.log("settings", settings);

      if (map) {
        setMap(
          map.setView(
            [settings.defaultCenter.Latitude, settings.defaultCenter.Longitude],
            defaultZoom
          )
        );
      }
    }
  }, [defaultZoom]);

  useEffect(() => {
    if (inspectZoom > 1) {
      setSettings({
        ...settings,
        inspectZoom: inspectZoom,
      });
      if (map) {
        setMap(
          map.setView(
            [settings.defaultCenter.Latitude, settings.defaultCenter.Longitude],
            inspectZoom
          )
        );
      }
    }
  }, [inspectZoom]);

  useEffect(() => {
    if (superZoom > 1) {
      setSettings({
        ...settings,
        superZoom: superZoom,
      });
      if (map) {
        setMap(
          map.setView(
            [settings.defaultCenter.Latitude, settings.defaultCenter.Longitude],
            superZoom
          )
        );
      }
    }
  }, [superZoom]);

  const handleOk = (e) => {
    props.setOpen(false);
  };

  const handleCancel = (e) => {
    props.setOpen(false);
    if (map) {
      setMap(
        map.setView(
          [settings.defaultCenter.Latitude, settings.defaultCenter.Longitude],
          settings.defaultZoom
        )
      );
    }
  };
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          setSettings({
            ...settings,
            defaultCenter: {
              Longitude: position.coords.longitude,
              Latitude: position.coords.latitude,
            },
          });
          setMap(
            map.setView(
              [
                settings.defaultCenter.Latitude,
                settings.defaultCenter.Longitude,
              ],
              settings.superZoom
            )
          );
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  };
  return (
    <>
      <Modal
        centered
        className={props.isOpen ? "open" : ""}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            <span>
              <SettingOutlined style={{ marginRight: "8px" }} />
              Settings
            </span>
          </div>
        }
        open={props.isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span>About</span>} key="1">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  About
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  National Map for the Rail Network in the UK, providing a
                  schematic representation of routes, stops, and the progress of
                  trains. The map will utilize data from the 3Squared Train Data
                  API, offering information such as coordinates for locations on
                  the rail network and the schedule for each train's journey.
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Tour
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Button onClick={() => setOpenGuide(true)}>Begin Tour</Button>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Version
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Tooltip title={`Version: ${versionNumber}`}>
                    <Typography.Link>{versionNumber}</Typography.Link>
                  </Tooltip>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Developed By
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-col gap-y-2">
                  <div className="flex gap-x-2">
                    <Tooltip title="GitHub: emorrisn">
                      <Typography.Link href="https://github.com/emorrisn">
                        Ethan Morrison
                      </Typography.Link>
                    </Tooltip>
                    <Tooltip title="GitHub: musicjoe12">
                      <Typography.Link href="https://github.com/musicjoe12">
                        Joe Grierson
                      </Typography.Link>
                    </Tooltip>
                    <Tooltip title="GitHub: Samuel12372">
                      <Typography.Link href="https://github.com/Samuel12372">
                        Sam Knowles
                      </Typography.Link>
                    </Tooltip>
                  </div>
                  <div className="flex gap-x-2">
                    <Tooltip title="GitHub: mRichardio">
                      <Typography.Link href="https://github.com/mRichardio">
                        Matthew Richards
                      </Typography.Link>
                    </Tooltip>
                    <Tooltip title="GitHub: sammo-2000">
                      <Typography.Link href="https://github.com/sammo-2000">
                        Ayman Sammo
                      </Typography.Link>
                    </Tooltip>
                  </div>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  License
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Tooltip title="MIT License">
                    <Typography.Link href="https://en.wikipedia.org/wiki/MIT_License">
                      MIT License
                    </Typography.Link>
                  </Tooltip>
                </dd>
              </div>
            </dl>
          </TabPane>
          <TabPane tab={<span>Map</span>} key="2">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Theme
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: themeItems,
                      selectable: true,
                      selectedKeys: settings.mapTheme.key,
                      onClick: (theme) => {
                        const themeItem = themeItems.find(
                          (item) => item.key === theme.key
                        );

                        message.info(`${themeItem.label} activated`);
                        setSettings({ ...settings, mapTheme: themeItem });
                        Cookies.set("theme", themeItem);
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {settings.mapTheme.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Rails
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: railsItems,
                      selectable: true,
                      selectedKeys: settings.rails.key,
                      onClick: (rails) => {
                        const railItem = railsItems.find(
                          (item) => item.key === rails.key
                        );

                        message.info(`${railItem.label} activated`);
                        setSettings({ ...settings, rails: railItem });
                        Cookies.set("theme", railItem);
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {settings.rails.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Zoom Controls
                </dt>
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: zoomControlsPositionItems,
                      selectable: true,
                      selectedKeys: settings.zoomControlsPosition.key,
                      onClick: (zoom) => {
                        const zoomItem = zoomControlsPositionItems.find(
                          (item) => item.key === zoom.key
                        );

                        message.info(`${zoomItem.label} activated`);
                        setSettings({
                          ...settings,
                          zoomControlsPosition: zoomItem,
                        });
                        Cookies.set("theme", zoomItem);
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {settings.zoomControlsPosition.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
              <div className="py-6 ">
                <Tabs tabPosition="left" defaultActiveKey="a">
                  <TabPane tab={<span>Default Zoom</span>} key="a">
                    <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <NumericInput
                        popPrefix="x"
                        popSuffix=" zoom, we recommend x6 to x12"
                        value={defaultZoom}
                        onChange={setDefaultZoom}
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-normal leading-6 text-gray-500">
                        This represents the default zoom level that your map
                        will initially display.
                      </p>
                    </div>
                  </TabPane>
                  <TabPane tab={<span>Inspect Zoom</span>} key="b">
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <NumericInput
                        popPrefix="x"
                        popSuffix=" zoom, we recommend x12 to x18"
                        value={inspectZoom}
                        onChange={setInspectZoom}
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-normal leading-6 text-gray-500">
                        Provides a closer view of an object, offering a more
                        detailed and magnified perspective for focused
                        examination.
                      </p>
                    </div>
                  </TabPane>
                  <TabPane tab={<span>Super Zoom</span>} key="c">
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <NumericInput
                        popPrefix="x"
                        popSuffix=" zoom, we recommend x16 to x24"
                        value={superZoom}
                        onChange={setSuperZoom}
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-normal leading-6 text-gray-500">
                        Provides a super close view of an object, offering a
                        more very detailed and magnified perspective.
                      </p>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Default Center
                </dt>
                <dd className="flex gap-x-2 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Input
                    value={settings.defaultCenter.Latitude}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        defaultCenter: {
                          ...settings.defaultCenter,
                          Latitude: e.target.value,
                        },
                      })
                    }
                  />
                  <Input
                    value={settings.defaultCenter.Longitude}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        defaultCenter: {
                          ...settings.defaultCenter,
                          Longitude: e.target.value,
                        },
                      })
                    }
                  />
                </dd>
                <div className="col-span-2 col-start-2 justify-end flex">
                  <Button onClick={getMyLocation}>Set location to local</Button>
                </div>
              </div>
            </dl>
          </TabPane>
          <TabPane tab={<span>Menus</span>} key="3">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Pagination
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: paginationItems,
                      selectable: true,
                      selectedKeys: settings.pagination.key,
                      onClick: (pagination) => {
                        const paginationItem = paginationItems.find(
                          (item) => item.key === pagination.key
                        );

                        message.info(`${paginationItem.label} activated`);
                        setSettings({
                          ...settings,
                          pagination: paginationItem,
                        });
                        Cookies.set("pagination", paginationItem);
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {settings.pagination.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Alignment
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: menuDirectionItems,
                      selectable: true,
                      selectedKeys: settings.menuDirection.key,
                      onClick: (menuDirection) => {
                        const menuDirectionItem = menuDirectionItems.find(
                          (item) => item.key === menuDirection.key
                        );

                        message.info(`${menuDirectionItem.label} activated`);
                        setSettings({
                          ...settings,
                          menuDirection: menuDirectionItem,
                        });
                        Cookies.set("alignment", menuDirectionItem);
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {settings.menuDirection.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Auto Close
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: menuAutoCloseItems,
                      selectable: true,
                      selectedKeys: settings.menuAutoClose.key,
                      onClick: (menuAutoClose) => {
                        const menuAutoCloseItem = menuAutoCloseItems.find(
                          (item) => item.key === menuAutoClose.key
                        );

                        message.info(`${menuAutoClose.label} activated`);
                        setSettings({
                          ...settings,
                          menuAutoClose: menuAutoCloseItem,
                        });
                        Cookies.set("alignment", menuAutoCloseItem);
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {settings.menuAutoClose.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
            </dl>
          </TabPane>
          <TabPane tab={<span>Notifications</span>} key="4">
            <TreeSelect
              className="w-full"
              treeData={notificationsOptions}
              value={settings.notifications}
              treeCheckable
              showCheckedStrategy={TreeSelect.SHOW_PARENT}
              placeholder="Please select notifications to enable/disable"
              onChange={(e) => {
                setSettings({ ...settings, notifications: e });
              }}
            />
          </TabPane>
          <TabPane tab={<span>Advanced</span>} key="5">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Cache
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex justify-end">
                  <Button
                    style={{ marginLeft: "8px" }}
                    danger
                    onClick={() => {
                      for (const cookieName in allCookies) {
                        Cookies.remove(cookieName);
                      }

                      // Fix for tour not resetting sometimes, don't remove
                      Cookies.remove("tour");

                      for (const item in localStorage) {
                        localStorage.removeItem(item);
                      }
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    }}
                  >
                    Reset
                  </Button>
                </dd>
              </div>
              <div className="px-4 py-6 ">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Developer Map Settings
                </dt>
                <Form
                  name="dynamic_form_nest_item"
                  onFinish={(values) => {
                    values.layers.map((layer) => {
                      railsItems.push({
                        label: layer.name,
                        key: railsItems.length.toString(),
                        url: layer.url,
                      });
                    });

                    // setSettings({ ...settings, mapTheme: themeItem });

                    message.info(`Custom layers changes made`);
                  }}
                  className="mt-4"
                  autoComplete="off"
                >
                  <Form.List name="layers">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "name"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing name",
                                },
                              ]}
                            >
                              <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "url"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing url",
                                },
                              ]}
                            >
                              <Input placeholder="URL" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add custom rail overlay
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Submit Changes
                      </Button>
                      <Tooltip title="Visit Leaflet Providers - Do not include {ext}!">
                        <QuestionCircleOutlined
                          onClick={() =>
                            window.open(
                              "https://leaflet-extras.github.io/leaflet-providers/preview/index.html"
                            )
                          }
                        />
                      </Tooltip>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            </dl>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};
export default Settings;
