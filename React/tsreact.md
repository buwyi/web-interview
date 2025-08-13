代码片段

```javascript
import { memo } from "react";
import type { FC, ComponentProps } from "react";

interface IProps extends ComponentProps<""> {
  //  children?: ReactNode;
}

export const Template: FC<IProps> = ({ children, classname, ...props }) => {
  return (
    <div {...props} className={clsx("", classname)}>
      Template
    </div>
  );
};

export default memo(Template);
```
