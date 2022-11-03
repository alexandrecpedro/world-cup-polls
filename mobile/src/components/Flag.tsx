import { Image, IImageProps } from "native-base";

export function Flag({ ...rest }: IImageProps) {
  return (
    <Image
      {...rest}
      alt="Flag"
      w={8}
      h={6}
      mx={3}
    />
  );
}