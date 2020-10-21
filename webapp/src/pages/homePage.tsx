// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react'
import { Archiver } from '../archiver'
import { MutableBoard } from '../blocks/board'
import Button from '../components/button'
import octoClient from '../octoClient'
import { IBlock } from '../blocks/block'
import { Utils } from '../utils'


type Props = {}

type State = {
    boards: IBlock[]
}

export default class HomePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            boards: [],
        }
    }

    componentDidMount() {
        this.loadBoards()
    }

    loadBoards = async () => {
	    const boards = await octoClient.getBlocksWithType('board')
        this.setState({boards})
    }

    importClicked = async () => {
	    Archiver.importFullArchive(() => {
	        this.loadBoards()
	    })
    }

    exportClicked = async () => {
	    Archiver.exportFullArchive()
    }

    addClicked = async () => {
	    const board = new MutableBoard()
	    await octoClient.insertBlock(board)
    }

    render(): React.ReactNode {
	    return (
    <div>
                <Button onClick={this.addClicked}>+ Add Board</Button>
                <br/>
                <Button onClick={this.addClicked}>Import Archive</Button>
                <br/>
                <Button onClick={this.addClicked}>Export Archive</Button>
                {this.state.boards.map((board) => (
            <p>
                        <a href={`/board/${board.id}`}>
                    <span>{board.title}</span>
                    <span>{Utils.displayDate(new Date(board.updateAt))}</span>
                </a>
                    </p>
                ))}
            </div>
        )
    }
}
