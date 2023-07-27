'use client'

import instanceImg from "@/assets/instance-img.jpeg";
import InstanceGrid from "@/components/common/InstanceGrid";
import { Container, MantineTheme, Tabs, TabsProps } from "@mantine/core";
import React from "react";

function StyledTabs(props: TabsProps) {
    return (
        <Tabs
            unstyled
            styles={(theme: MantineTheme) => ({
                root: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                },
                tab: {
                    ...theme.fn.focusStyles(),
                    backgroundColor: "#fff",
                    border: "none",
                    color: "#131313",
                    padding: "12px 24px",
                    cursor: 'pointer',
                    fontSize: "20px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: "12px",


                    '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                    },

                    '&[data-active]': {
                        backgroundColor: theme.colors.blue[7],
                        borderColor: theme.colors.blue[7],
                        color: "#fff",
                    },
                },
                tabsList: {
                    display: 'inline-flex',
                    margin: "50px 0",
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset",
                    gap: "10px"
                },
            })}
            {...props}
        />
    );
}

const InstanceSection: React.FC = () => {
    return (
        <Container size="xl" px="xs">
            <StyledTabs defaultValue="instance1">
                <Tabs.List position="center">
                    <Tabs.Tab value="instance1">
                        Instance 1
                    </Tabs.Tab>
                    <Tabs.Tab value="instance2">
                        Instance 2
                    </Tabs.Tab>
                    <Tabs.Tab value="instance3">
                        Instance 3
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="instance1">
                    <InstanceGrid
                        instanceType='Instance 1'
                        title='Instance Name'
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu dolor orci. Vestibulum ornare in leo in varius. Duis aliquam nisl.'
                        buttonText='Enter Instance'
                        instanceUpdated='19/07/2023'
                        image={instanceImg}
                    />
                </Tabs.Panel>
                <Tabs.Panel value="instance2">
                    <InstanceGrid
                        instanceType='Instance 2'
                        title='Instance Name 2'
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu dolor orci. Vestibulum ornare in leo in varius. Duis aliquam nisl.'
                        buttonText='Enter Instance'
                        instanceUpdated='19/07/2023'
                        image={instanceImg}
                    />
                </Tabs.Panel>
                <Tabs.Panel value="instance3">
                    <InstanceGrid
                        instanceType='Instance 3'
                        title='Instance Name 3'
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu dolor orci. Vestibulum ornare in leo in varius. Duis aliquam nisl.'
                        buttonText='Enter Instance'
                        instanceUpdated='19/07/2023'
                        image={instanceImg}
                    />
                </Tabs.Panel>
            </StyledTabs>
        </Container>
    );
};

export default InstanceSection;
