import { useEffect, useState } from 'react'
import { Category } from '../../shared/api/types'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useUnit } from 'effector-react'
import { userModel } from '../../entities/user/model'
import { COLORS } from '../../shared/styles/colors'
import { TEXT_SIZE_3_LIGHT, TEXT_SIZE_5 } from '../../shared/styles/fonts'
import { FieldBig } from '../../shared/ui/FieldBig'
import { DropdownMenu } from '../../shared/ui/DropdownMenu'
import { ToggleButtonSmall } from '../../shared/ui/ToggleButtonSmall'
import { Star } from '../../shared/icons/Star'
import { FieldSmall } from '../../shared/ui/FieldSmall'
import { Clock } from '../../shared/icons/Clock'
import { $categories } from '../../shared/model'
import { createCategoryFx, adminPageMounted, adminPageUnMounted } from './model'
import { IngredientAddingRow } from '../IngredientAddingRow'
import { GoBackButton } from '../GoBackButton'
import { NutritionFactsTable } from '../../shared/ui/NutritionFactsTable'
import { FilesInput } from '../FilesInput'
import { BigButton } from '../Buttons/BigButton'
import { TextButton } from '../Buttons/TextButton'

export const Admin = () => {
  const navigate = useNavigate()
  const [pageMounted, pageUnMounted] = useUnit([
    adminPageMounted,
    adminPageUnMounted,
  ])
  const [name, setName] = useState('')
  const [categoryList] = useUnit([$categories])
  const [chosenCategories, setChosenCategories] = useState<Category[]>([])

  const [logout] = useUnit([userModel.events.logout])
  const timesUnit = ['h', 'min']
  const menuChapters = ['Fire', 'Air', 'Eath', '5 Element', 'HLS', 'Ethanol']
  const { title } = useParams<{ title: string }>()

  useEffect(() => {
    pageMounted()
    return () => pageUnMounted()
  }, [])

  return (
    <div>
      <Button
        onClick={() => {
          logout()
          navigate('/', { replace: true })
        }}
      >
        Logout
      </Button>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createCategoryFx(name)
          setName('')
        }}
      ></form>
      <Nav>
        <GoBackButton to={`/${title}`} />
        <Title>{title}</Title>
      </Nav>
      <Layout>
        <SettingLayout columnStart={1} columnEnd={3}>
          <Name>Name</Name>
          <FieldBig name="" placeholder="" type=""></FieldBig>
        </SettingLayout>

        <SettingLayout columnStart={1} columnEnd={2}>
          <Name>Category</Name>
          <DropdownMenu optionsArray={menuChapters}></DropdownMenu>
        </SettingLayout>

        <SettingLayout columnStart={1} columnEnd={3}>
          <Name>Tags</Name>
          <TagsWrapper>
            {categoryList?.map((category) => {
              return (
                <ToggleButtonSmall<Category>
                  key={category._id}
                  label={category}
                  labels={chosenCategories}
                  setLabels={(labels) => {
                    setChosenCategories(labels)
                  }}
                />
              )
            })}
          </TagsWrapper>
        </SettingLayout>

        <SettingLayout columnStart={1} columnEnd={2}>
          <Name>Rate</Name>
          <RateWrapper>
            <FieldSmall
              placeholder=""
              type="text"
              name=""
              iconVisible={false}
            ></FieldSmall>
            <Star height="24" width="24" />
          </RateWrapper>
        </SettingLayout>

        <SettingLayout columnStart={1} columnEnd={2}>
          <Name>Time</Name>
          <TimeWrapper>
            <FieldSmall
              placeholder=""
              type="search"
              name=""
              iconVisible={false}
            ></FieldSmall>
            <DropdownMenu optionsArray={timesUnit}></DropdownMenu>
            <Clock height="24" width="24" />
          </TimeWrapper>
        </SettingLayout>

        <SettingLayout columnStart={1} columnEnd={3}>
          <Name>Ingredients</Name>
          <IngredientAddingRow
            labelColor={COLORS.oliveGreen}
          ></IngredientAddingRow>
        </SettingLayout>

        <SettingLayout columnStart={1} columnEnd={3}>
          <Name>Recipe</Name>
          <RecipeStepWrapper>
            1 <FieldSmall iconVisible={false} name="" type="text"></FieldSmall>
          </RecipeStepWrapper>
        </SettingLayout>

        <SettingLayout columnStart={1} columnEnd={3}>
          <Name>
            Nutrition Facts <NutritionMark>(per 100g)</NutritionMark>
          </Name>
          <NutritionFactsTable></NutritionFactsTable>
        </SettingLayout>

        <SettingLayout columnStart={1} columnEnd={3}>
          <Name>Upload image</Name>
          <FilesInput />
        </SettingLayout>
        <SettingLayout columnStart={1} columnEnd={2}>
          <TextButton>Delete recipe</TextButton>
        </SettingLayout>
        <SettingLayout columnStart={2} columnEnd={3}>
          <BigButton>Save</BigButton>
        </SettingLayout>
      </Layout>
    </div>
  )
}

const Nav = styled.div`
  height: calc(26px + 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h2`
  font-family: 'Enthalpy 298';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #ffffff;
`

const NutritionMark = styled.span`
  position: relative;
  ${TEXT_SIZE_5}
  color: ${COLORS.lightGray};
`

const RecipeStepWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 6px;
  width: 100%;

  ${TEXT_SIZE_3_LIGHT}
  color: ${COLORS.white};
`
const TimeWrapper = styled.div`
  display: grid;

  grid-template-columns: 42% 36% 13%;
  column-gap: 10px;
  row-gap: 32px;

  align-items: center;
  padding: 0px;
  gap: 8px;

  width: 100%;

  flex-grow: 0;
  min-height: 0; /* NEW */
  min-width: 0;
`
const RateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;

  width: 100%;

  flex: none;
  order: 1;
  flex-grow: 0;
`
const TagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  padding: 0px;
  gap: 4px;

  width: 100%;

  flex: none;
  order: 1;
  flex-grow: 0;
`
const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  justify-content: flex-start;
  row-gap: 32px;

  min-height: 0; /* NEW */
  min-width: 0;
`
const Button = styled.button`
  position: absolute;
  top: 16px;
  right: 32px;
`
const SettingLayout = styled.div<{ columnStart: number; columnEnd: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  grid-column: ${({ columnStart }) => columnStart} /
    ${({ columnEnd }) => columnEnd};
  gap: 8px;

  min-width: 0;
`
const Name = styled.div`
  color: ${COLORS.white} ${TEXT_SIZE_3_LIGHT};
`
