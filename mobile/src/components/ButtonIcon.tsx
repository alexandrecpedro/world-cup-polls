import { useTheme } from "native-base";
import { IconProps } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
    icon: React.FC<IconProps>;
}

export function ButtonIcon({ icon: Icon, ...rest }: Props) {
    /** REACT HOOK **/
    // useTheme
    const { colors, sizes } = useTheme();

    return (
        <TouchableOpacity {...rest}>
            <Icon color={colors.gray[300]} size={sizes[6]} />
        </TouchableOpacity>
    );
}