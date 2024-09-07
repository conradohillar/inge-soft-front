import React from 'react'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'

import type { FontSizeTokens, SelectProps } from 'tamagui'
import { Adapt, Select, Sheet, YStack, getFontSize } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

// interface Item {
//     name: string;
//   }
  
// interface SelectTagProps extends SelectProps {
//   items: Item[];
//   label: string;
// }
  
export default function SelectField({ items, label, ...props}) {

  const [val, setVal] = React.useState('')
  const isPlaceholder = val === ''

  return (
    <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
      <Select.Trigger width={350} height={60} iconAfter={ChevronDown} className='bg-primary text-black rounded-2xl mx-8'>
        <Select.Value placeholder={items[0]?.name} className='text-base font-qsemibold' 
                        style={{color: isPlaceholder ? "#bbb":"#000"}} />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame backgroundColor="$colorTransparent">
            <Sheet.ScrollView >
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            backgroundColor="$colorTransparent"
          />
        </Sheet>
      </Adapt>
        
      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} color="black"/>
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          animation="quick"
          animateOnly={['transform', 'opacity']}
          enterStyle={{ o: 0, y: -10 }}
          exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <YStack className='items-center'>
            <Select.Label className='text-base text-primary font-qbold bg-secondary w-[380px] mx-8' 
                            style={{borderTopLeftRadius: 15, borderTopRightRadius:15}}>
                {label}
            </Select.Label>
            {/* for longer lists memoizing these is useful */}
            {React.useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}
                      className='bg-primary border border-gray-100 w-[380px] mx-8'
                    >
                      <Select.ItemText className='text-base text-black font-qsemibold'>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={20} color="black"/>
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [items]
            )}
            </YStack>
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'$4'}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} color="black" />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['transparent', '$background']}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}
