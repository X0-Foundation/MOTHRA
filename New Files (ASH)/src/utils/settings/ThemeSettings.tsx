import ThemeContrast from "src/components/settings/ThemeContrast";
import ThemeRtlLayout from "src/components/settings/ThemeRtlLayout";
import ThemeColorPresets from "src/components/settings/ThemeColorPresets";
import SettingsDrawer from "src/components/settings/drawer/SettingsDrawer";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeSettings({ children }: Props) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        <ThemeRtlLayout>
          {children}
          <SettingsDrawer />
        </ThemeRtlLayout>
      </ThemeContrast>
    </ThemeColorPresets>
  );
}
