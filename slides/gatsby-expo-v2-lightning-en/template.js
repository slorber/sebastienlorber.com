import React from 'react';
import { Box, FlexBox, Progress } from 'spectacle';

const template = () => (
        <FlexBox
                justifyContent="space-between"
                position="absolute"
                width={1}
                style={{bottom: 2}}
        >
                <Box
                        style={{
                                paddingLeft: 10,
                                opacity: 0,
                        }}
                >
                        @sebastienlorber
                </Box>
                <Box>
                        <Progress />
                </Box>
                <Box
                        style={{
                                paddingRight: 10,
                        }}
                >
                        @sebastienlorber
                </Box>
        </FlexBox>
);

export default template;
