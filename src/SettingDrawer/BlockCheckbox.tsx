import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import React from 'react';

export interface BlockCheckboxProps {
  value: string;
  onChange: (key: string) => void;
  list: {
    title: string;
    key: string;
    url: string;
  }[];
}

const baseClassName = 'ant-pro-setting-drawer-block-checkbox';

const BlockCheckbox: React.FC<BlockCheckboxProps> = ({
  value,
  onChange,
  list,
}) => (
  <div className={baseClassName} key={value}>
    {list.map(item => (
      <Tooltip title={item.title} key={item.key}>
        <div
          className={`${baseClassName}-item`}
          onClick={() => onChange(item.key)}
        >
          <img src={item.url} alt={item.key} />
          <div
            className={`${baseClassName}-selectIcon`}
            style={{
              display: value === item.key ? 'block' : 'none',
            }}
          >
            <CheckOutlined />
          </div>
        </div>
      </Tooltip>
    ))}
  </div>
);

export default BlockCheckbox;
